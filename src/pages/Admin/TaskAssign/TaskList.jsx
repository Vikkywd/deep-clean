// src/pages/WorkerDashboard.js
import React, { useState } from 'react';
import { Table, Button, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const mockJobs = [
    {
        id: 'job1',
        client: 'John Doe',
        address: '123 Main St',
        date: '2025-05-15',
        status: 'Assigned',
    },
    {
        id: 'job2',
        client: 'Alice Smith',
        address: '456 Oak Ave',
        date: '2025-05-16',
        status: 'In Progress',
    },
];

const TaskList = () => {
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');


    const filteredData = mockJobs.filter((item) =>
        item?.client?.toLowerCase().includes(searchText)
      );

    const navigate = useNavigate();

    const columns = [
        { title: 'Client', dataIndex: 'client' },
        { title: 'Address', dataIndex: 'address' },
        { title: 'Date', dataIndex: 'date' },
        { title: 'Status', dataIndex: 'status' },
        {
            title: 'Action',
            render: (record) => (
                <Button onClick={() => navigate(`/worker/job/${record.id}`)}>View</Button>
            ),
        },
    ];
    const handleSearch = (e) => {
        setSearchText(e.target?.value?.toLowerCase());
    };
    return (

        <div className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                <Title level={4} className="!mb-0">
                    Total - {filteredData.length}
                </Title>
                
                <Input
                    placeholder="Search by name..."
                    style={{ width: 250 }}
                    allowClear
                    onChange={handleSearch}
                />
            </div>

            <Table
                loading={loading}
                columns={columns}
                bordered
                rowKey={(render) => render._id}
                dataSource={filteredData}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1200 }}
            />
        </div>
        // <div className="p-6">
        //   {/* <h1 className="text-2xl font-semibold mb-4"> Assigned Jobs</h1> */}
        //   <Table rowKey="id" columns={columns} dataSource={mockJobs} />
        // </div>
    );
};

export default TaskList;
