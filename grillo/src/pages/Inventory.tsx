import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const Inventory = () => {
  const inventoryItems = [
    {
      id: 1,
      name: "Blood Bag Type A+",
      quantity: 150,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Blood Bag Type B-",
      quantity: 50,
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Blood Bag Type O+",
      quantity: 200,
      status: "In Stock",
    },
    {
      id: 4,
      name: "Blood Bag Type AB+",
      quantity: 30,
      status: "Out of Stock",
    },
  ];

  const statusColors = {
    "In Stock": "bg-green-100 text-green-800",
    "Low Stock": "bg-amber-100 text-amber-800",
    "Out of Stock": "bg-red-100 text-red-800",
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Inventory</CardTitle>
          <CardDescription>
            Manage blood inventory levels and track stock status.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            {inventoryItems.map((item) => (
              <Card key={item.id} className="shadow-sm">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div>
                    <Badge className={statusColors[item.status]}>
                      {item.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="flex-1 bg-[#D11B2F] hover:bg-[#A71526] cursor-pointer">
            Add New Item
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
