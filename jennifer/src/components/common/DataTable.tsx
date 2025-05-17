import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  searchable?: boolean;
  searchFields?: Array<keyof T>;
  onRowClick?: (item: T) => void;
  pagination?: boolean;
  pageSize?: number;
  emptyMessage?: string;
}

function DataTable<T>({
  columns,
  data,
  keyField,
  searchable = false,
  searchFields = [],
  onRowClick,
  pagination = true,
  pageSize = 10,
  emptyMessage = 'No data available'
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({
    key: null,
    direction: 'asc',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Handle sorting
  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort data
  let filteredData = [...data];

  // Apply search if searchable
  if (searchable && searchTerm) {
    filteredData = filteredData.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      });
    });
  }

  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      filteredData = filteredData.filter((item) => {
        const itemValue = item[key as keyof T];
        if (typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }
        return false;
      });
    }
  });

  // Apply sorting
  if (sortConfig.key) {
    filteredData.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];
      
      if (aValue === bValue) return 0;
      
      const comparison = (() => {
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue;
        }
        
        if (aValue instanceof Date && bValue instanceof Date) {
          return aValue.getTime() - bValue.getTime();
        }
        
        // Convert to string as fallback
        return String(aValue).localeCompare(String(bValue));
      })();
      
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }

  // Pagination
  const totalPages = pagination ? Math.ceil(filteredData.length / pageSize) : 1;
  const paginatedData = pagination
    ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : filteredData;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({});
    setSortConfig({ key: null, direction: 'asc' });
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Table controls */}
      {(searchable || Object.keys(filters).length > 0) && (
        <div className="p-4 border-b flex flex-wrap items-center gap-3">
          {searchable && (
            <div className="relative flex-1 min-w-[200px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
          )}

          {Object.keys(filters).length > 0 && (
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-neutral-400 mr-2" />
              <span className="text-sm text-neutral-500 mr-2">Filters:</span>
              <button
                className="text-xs text-primary-500 hover:text-primary-700"
                onClick={clearFilters}
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider ${
                    column.width ? column.width : ''
                  } ${column.sortable ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    if (column.sortable && typeof column.accessor === 'string') {
                      handleSort(column.accessor);
                    }
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && typeof column.accessor === 'string' && (
                      <span className="flex flex-col">
                        <ChevronUp
                          className={`h-3 w-3 -mb-1 ${
                            sortConfig.key === column.accessor && sortConfig.direction === 'asc'
                              ? 'text-primary-500'
                              : 'text-neutral-300'
                          }`}
                        />
                        <ChevronDown
                          className={`h-3 w-3 ${
                            sortConfig.key === column.accessor && sortConfig.direction === 'desc'
                              ? 'text-primary-500'
                              : 'text-neutral-300'
                          }`}
                        />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr
                  key={String(item[keyField])}
                  className={`hover:bg-neutral-50 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 whitespace-nowrap">
                      {column.cell
                        ? column.cell(item)
                        : typeof column.accessor === 'function'
                        ? column.accessor(item)
                        : String(item[column.accessor])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-sm text-neutral-500 text-center"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-4 py-3 flex items-center justify-between border-t">
          <div className="flex-1 flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">
                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, filteredData.length)}
                </span>{' '}
                of <span className="font-medium">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    // Show all pages if 5 or fewer
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    // Near start
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    // Near end
                    pageNum = totalPages - 4 + i;
                  } else {
                    // Middle
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                          : 'bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;