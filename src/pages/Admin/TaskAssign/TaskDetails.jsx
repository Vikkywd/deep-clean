// src/pages/JobDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Select } from 'antd';

const { Option } = Select;

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = {
    id,
    client: 'John Doe',
    address: '123 Main St',
    date: '2025-05-15',
    status: 'Assigned',
  };

  const handleStatusChange = (value) => {
    console.log(`Job ${id} updated to: ${value}`);
    navigate('/worker/dashboard');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Job Details</h2>
      <p><strong>Client:</strong> {job.client}</p>
      <p><strong>Address:</strong> {job.address}</p>
      <p><strong>Date:</strong> {job.date}</p>

      <div className="mt-4">
        <Select
          defaultValue={job.status}
          onChange={handleStatusChange}
          className="w-full"
        >
          <Option value="Assigned">Assigned</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>

        <Button
          type="primary"
          block
          className="mt-4"
          onClick={() => handleStatusChange('Completed')}
        >
          Mark as Completed
        </Button>
      </div>
    </div>
  );
};

export default TaskDetails;
