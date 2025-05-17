import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { logbookEntries, LogbookEntry } from '../../data/logbookEntries';
import { 
  Calendar, PlusCircle, CheckCircle, Clock, AlertCircle, 
  Filter, ChevronDown, FileText, MessageSquare, Paperclip, 
  ChevronLeft, ChevronRight, Search
} from 'lucide-react';

const Logbook: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'calendar' | 'list'>('list');
  const [selectedEntry, setSelectedEntry] = useState<LogbookEntry | null>(null);
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get student's logbook entries
  const studentEntries = logbookEntries
    .filter(entry => entry.studentId === user?.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Apply filters and search
  const filteredEntries = studentEntries.filter(entry => {
    // Apply status filter
    if (filterStatus !== 'all' && entry.status !== filterStatus) {
      return false;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        entry.title.toLowerCase().includes(query) || 
        entry.description.toLowerCase().includes(query) ||
        entry.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  // Calendar data preparation
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Get days in month
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
  
  // Create calendar days array
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }
  
  // Get entries for the current month
  const entriesForMonth = studentEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
  });
  
  // Check if a day has entries
  const hasEntryOnDay = (day: number) => {
    return entriesForMonth.some(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getDate() === day;
    });
  };
  
  // Get entries for a specific day
  const getEntriesForDay = (day: number) => {
    return entriesForMonth.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getDate() === day;
    });
  };

  // New entry form fields
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    description: '',
    skills: '',
    hours: 8,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally submit to a backend, but for demo we'll just close the modal
    setIsNewEntryModalOpen(false);
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      description: '',
      skills: '',
      hours: 8,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Digital Logbook</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and document your daily industrial training activities
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setIsNewEntryModalOpen(true)}
              className="btn-primary"
            >
              <PlusCircle size={18} className="mr-2" />
              New Entry
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-card">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('list')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'list'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText size={18} className="inline-block mr-2" />
              List View
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'calendar'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar size={18} className="inline-block mr-2" />
              Calendar View
            </button>
          </nav>
        </div>

        {/* Search and Filter Bar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search entries..."
                className="w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="w-full sm:w-auto">
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="h-full w-full rounded-md border-gray-300 pl-3 pr-8 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="submitted">Submitted</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <Filter size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* List View */}
        {activeTab === 'list' && (
          <div className="overflow-x-auto">
            {filteredEntries.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hours
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEntries.map((entry) => (
                    <tr 
                      key={entry.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedEntry(entry)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(entry.date).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{entry.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {entry.description.substring(0, 60)}
                          {entry.description.length > 60 ? '...' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{entry.hours} hrs</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.status === 'draft' && (
                          <span className="tag-gray">Draft</span>
                        )}
                        {entry.status === 'submitted' && (
                          <span className="tag-yellow">Submitted</span>
                        )}
                        {entry.status === 'reviewed' && (
                          <span className="tag-blue">Reviewed</span>
                        )}
                        {entry.status === 'approved' && (
                          <span className="tag-green">Approved</span>
                        )}
                        {entry.status === 'rejected' && (
                          <span className="tag-red">Rejected</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          {entry.comments?.length ? (
                            <div className="text-gray-500 flex items-center">
                              <MessageSquare size={16} className="mr-1" />
                              {entry.comments.length}
                            </div>
                          ) : null}
                          
                          {entry.attachments?.length ? (
                            <div className="text-gray-500 flex items-center">
                              <Paperclip size={16} className="mr-1" />
                              {entry.attachments.length}
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No logbook entries found</p>
              </div>
            )}
          </div>
        )}

        {/* Calendar View */}
        {activeTab === 'calendar' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={goToPreviousMonth}
                className="text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={goToNextMonth}
                className="text-gray-500 hover:text-gray-700"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden shadow">
              {/* Day labels */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="bg-gray-100 py-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {calendarDays.map((day, index) => (
                <div 
                  key={index} 
                  className={`min-h-[100px] bg-white p-2 ${
                    day ? 'cursor-pointer hover:bg-gray-50' : ''
                  }`}
                  onClick={() => day && hasEntryOnDay(day) && setSelectedEntry(getEntriesForDay(day)[0])}
                >
                  {day && (
                    <>
                      <div className="flex justify-between items-start">
                        <span className={`text-sm font-medium ${
                          new Date().getDate() === day && 
                          new Date().getMonth() === currentMonth && 
                          new Date().getFullYear() === currentYear
                            ? 'bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                            : 'text-gray-700'
                        }`}>
                          {day}
                        </span>
                        {hasEntryOnDay(day) && (
                          <div className="flex space-x-1">
                            {getEntriesForDay(day).some(e => e.status === 'approved') && (
                              <CheckCircle size={16} className="text-green-500" />
                            )}
                            {getEntriesForDay(day).some(e => e.status === 'submitted') && (
                              <Clock size={16} className="text-yellow-500" />
                            )}
                            {getEntriesForDay(day).some(e => e.status === 'rejected') && (
                              <AlertCircle size={16} className="text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {hasEntryOnDay(day) && (
                        <div className="mt-1">
                          {getEntriesForDay(day).map((entry, i) => (
                            <div 
                              key={i} 
                              className={`text-xs p-1 mb-1 rounded truncate ${
                                entry.status === 'approved' ? 'bg-green-100 text-green-800' :
                                entry.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                                entry.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                                entry.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {entry.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Entry Details Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{selectedEntry.title}</h2>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-start mb-6">
                <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
                  <span className="text-sm font-medium text-gray-500">Date</span>
                  <div className="text-sm text-gray-900">
                    {new Date(selectedEntry.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
                  <span className="text-sm font-medium text-gray-500">Hours</span>
                  <div className="text-sm text-gray-900">{selectedEntry.hours} hours</div>
                </div>
                <div className="w-full sm:w-1/3">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <div>
                    {selectedEntry.status === 'draft' && (
                      <span className="tag-gray">Draft</span>
                    )}
                    {selectedEntry.status === 'submitted' && (
                      <span className="tag-yellow">Submitted</span>
                    )}
                    {selectedEntry.status === 'reviewed' && (
                      <span className="tag-blue">Reviewed</span>
                    )}
                    {selectedEntry.status === 'approved' && (
                      <span className="tag-green">Approved</span>
                    )}
                    {selectedEntry.status === 'rejected' && (
                      <span className="tag-red">Rejected</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                <div className="text-sm text-gray-900 whitespace-pre-line bg-gray-50 p-4 rounded-md">
                  {selectedEntry.description}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Skills Acquired/Applied</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.skills.map((skill, index) => (
                    <span key={index} className="tag-blue">{skill}</span>
                  ))}
                </div>
              </div>
              
              {selectedEntry.attachments && selectedEntry.attachments.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Attachments</h3>
                  <div className="space-y-2">
                    {selectedEntry.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center bg-gray-50 p-3 rounded-md">
                        <Paperclip size={18} className="text-gray-500 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{attachment.name}</div>
                          <div className="text-xs text-gray-500">
                            {attachment.type === 'image' ? 'Image' : 
                             attachment.type === 'document' ? 'Document' : 'Link'}
                          </div>
                        </div>
                        <a 
                          href={attachment.url} 
                          className="ml-auto btn-outline py-1 px-3 text-xs"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedEntry.comments && selectedEntry.comments.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Supervisor Comments</h3>
                  <div className="space-y-4">
                    {selectedEntry.comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between mb-2">
                          <div>
                            <span className="text-sm font-medium text-gray-900">{comment.userName}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              {comment.userRole === 'academic-supervisor' ? 'Academic Supervisor' : 
                               comment.userRole === 'industry-supervisor' ? 'Industry Supervisor' : 
                               'Coordinator'}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <button
                onClick={() => setSelectedEntry(null)}
                className="btn-outline"
              >
                Close
              </button>
              
              {selectedEntry.status === 'draft' && (
                <button className="btn-primary">
                  Submit for Review
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Entry Modal */}
      {isNewEntryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">New Logbook Entry</h2>
              <button
                onClick={() => setIsNewEntryModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Summarize your activities"
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide details of the tasks performed"
                    required
                    rows={5}
                    className="form-input resize-none"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    Skills Acquired/Applied
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g. Programming, Communication, Teamwork (comma separated)"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                    Hours Spent
                  </label>
                  <input
                    type="number"
                    id="hours"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    min="1"
                    max="24"
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachments (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Paperclip size={24} className="mx-auto text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF, PDF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsNewEntryModalOpen(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <div className="space-x-2">
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                  >
                    Save as Draft
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logbook;