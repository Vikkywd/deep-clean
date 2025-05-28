import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EnquireList, DeleteEnquire } from '../../../redux/slices/enquireSlice'; 
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment';

function Enquire() {
  const dispatch = useDispatch();
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  // const enquireListData = useSelector((state)=>state.enquire)   

  const { search } = location;

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleDelete = async(e)=>{
      await dispatch(DeleteEnquire({_id: e?._id}));  
      await getEnquireList() 
  }
  
  const filteredData = datas.filter((item) =>
    item.name.toLowerCase().includes(searchText)
  );

  const TableHeading = [
    {
      title: 'S.no',
      dataIndex: '_id',
      render: (text, row, index) => index + 1,
      onFilter: (value, record) => record.typeObj.name === value,
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      // render: (text, row) => (
        // <Link className="text-blue-500" to={`${row.service_id}`}>
        //   {text}
        // </Link>
      // ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      // filters: [
      //   { text: 'Decor', value: 'Decor' },
      //   { text: 'Cleaning', value: 'Cleaning' },
        // Add more categories as needed
      // ],
      // onFilter: (value, record) => record.typeObj.name === value,
    },
    {
      title: 'phone',
      dataIndex:'phone',
    //   sorter: (a, b) =>
    //     a.addressObj?.newCity?.city.localeCompare(b.addressObj?.newCity?.city),
    },
    {
      title: 'Address',
      dataIndex: 'propertyAddress',
      // filters: [
      //   { text: 'Gujarat', value: 'Gujarat' },
      //   { text: 'Maharashtra', value: 'Maharashtra' },
      //   // Add more states as needed
      // ],
      // onFilter: (value, record) =>
      //   record.addressObj?.newState?.state === value,
    },
    {
      title: 'Visit Date',
      dataIndex: 'preferredDate',
      render: (date) =>
        date ? moment(date).format('DD MMM YYYY') : 'Not Specified'
      },
    {
      title: 'Action',
      dataIndex: '',
      render: (_, record) => (
        <div className="flex gap-3 text-lg">
          <EyeOutlined
            onClick={() => handleView(record)}
            className="text-blue-500 cursor-pointer hover:scale-110 transition-transform duration-200"
          />
          <EditOutlined
            onClick={() => handleEdit(record)}
            className="text-green-500 cursor-pointer hover:scale-110 transition-transform duration-200"
          />
          <DeleteOutlined
            onClick={() => handleDelete(record)}
            className="text-red-500 cursor-pointer hover:scale-110 transition-transform duration-200"
          />
        </div>
      ),
      width: 120,
    },
  ];

  const getEnquireList = async()=>{
    const {payload} = await dispatch(EnquireList())
    setData(payload?.data?.data);
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getEnquireList()
      setLoading(false);
    }, 500);
  }, [search, setData]);

  return (
     <div className="">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workers</h2>
          <p className="text-gray-500">Manage your cleaning service professionals</p>
        </div>
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
        // scroll={{ x: 1200 }}
      />
     
    </div>
  );
}

export default Enquire;
