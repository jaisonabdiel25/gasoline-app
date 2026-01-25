"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreatePage = () => {
  return (
    <div>
      <Input
        placeholder="Amount"
        type="number"
        className="mb-4 w-full max-w-sm"
      />
      <Input
        placeholder="Vehicle ID"
        type="text"
        className="mb-4 w-full max-w-sm"
      />
      <Button className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Create Payment
      </Button>
    </div>
  );
};

export default CreatePage;
