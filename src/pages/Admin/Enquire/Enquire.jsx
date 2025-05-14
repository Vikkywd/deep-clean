import React, { useState, useEffect } from 'react';
import { Table, Typography, Input } from 'antd';
import { Link, useLocation } from 'react-router-dom';
const { Title } = Typography;

function Enquire() {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const { search } = location;

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = datas.filter((item) =>
    item.name.toLowerCase().includes(searchText)
  );

  const TableHeading = [
    {
      title: 'S.no',
      dataIndex: '_id',
      render: (text, row, index) => index + 1,
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, row) => (
        <Link className="text-blue-500" to={`${row.service_id}`}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Category',
      dataIndex: ['typeObj', 'name'],
      filters: [
        { text: 'Decor', value: 'Decor' },
        { text: 'Cleaning', value: 'Cleaning' },
        // Add more categories as needed
      ],
      onFilter: (value, record) => record.typeObj.name === value,
    },
    {
      title: 'City',
      dataIndex: ['addressObj', 'newCity', 'city'],
      sorter: (a, b) =>
        a.addressObj?.newCity?.city.localeCompare(b.addressObj?.newCity?.city),
    },
    {
      title: 'State',
      dataIndex: ['addressObj', 'newState', 'state'],
      filters: [
        { text: 'Gujarat', value: 'Gujarat' },
        { text: 'Maharashtra', value: 'Maharashtra' },
        // Add more states as needed
      ],
      onFilter: (value, record) =>
        record.addressObj?.newState?.state === value,
    },
    {
      title: 'Owner',
      dataIndex: ['ownerObj', 'name'],
      render: (data) => data || 'Not Specified',
    },
    {
      title: 'Owner Number',
      dataIndex: ['ownerObj', 'phone'],
      render: (data) => data || 'Not Specified',
    },
    {
      title: 'Experience',
      dataIndex: 'experiance',
      sorter: (a, b) =>
        parseInt(a.experiance) - parseInt(b.experiance),
    },
    {
      title: 'Customers Served',
      dataIndex: 'customers_served',
      sorter: (a, b) => parseInt(a.customers_served) - parseInt(b.customers_served),
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData([
        {
          _id: '6032827875ab6731543e1d96',
          service_id: '6',
          name: 'Poonam Decor',
          experiance: '10',
          customers_served: '111',
          typeObj: { name: 'Decor' },
          addressObj: {
            newCity: { city: 'Morbi' },
            newState: { state: 'Gujarat' },
          },
          ownerObj: {
            name: 'Rakesh Sharma',
            phone: '4657687980',
          },
        },
      ]);
      setLoading(false);
    }, 500);
  }, [search]);

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
        columns={TableHeading}
        bordered
        rowKey={(render) => render._id}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
}

export default Enquire;
