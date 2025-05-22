import { Button, Form, Input, Select, DatePicker, InputNumber, notification, } from 'antd';
import { AddBooking } from '../../../redux/slices/bookingSlice';
import moment from 'moment';
import { useDispatch } from 'react-redux';

const { TextArea } = Input;

const BookingForm = ({onClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleCreateBooking = async(values) => {
    console.log('Booking Submitted:', values);
    const allBooking = await dispatch(AddBooking(values));
    form.resetFields();
    if(allBooking){
      notification.success({
        message: 'Booking Added Successfully!',
        placement: 'topRight'
      });
      onClose()
    }else{
      notification.error({
        message: 'Something went wroung!',
        placement: 'topRight'
      });
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleCreateBooking}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item name="clientName" label="Client Name" rules={[{ required: true }]}>
              <Input placeholder="Enter client name" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
              <Input placeholder="(555) 123-4567" />
            </Form.Item>
          </div>
          <Form.Item name="propertyAddress" label="Address" rules={[{ required: true }]}>
            <Input placeholder="Enter service address" />
          </Form.Item>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item name="service" label="Service Type" rules={[{ required: true }]}>
              <Select placeholder="Select service">
                <Option value="regular">Regular Cleaning</Option>
                <Option value="deep">Deep Cleaning</Option>
                <Option value="window">Window Cleaning</Option>
                <Option value="carpet">Carpet Cleaning</Option>
                <Option value="moveout">Move-out Cleaning</Option>
              </Select>
            </Form.Item>
            <Form.Item name="serviceDate" label="Service Date" rules={[{ required: true }]}>
              <DatePicker
                className="w-full"
                format="YYYY-MM-DD"
                disabledDate={(current) => current && current < moment().startOf('day')}
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item name="serviceTime" label="Service Time" rules={[{ required: true }]}>
              <Select placeholder="Select time">
                <Option value="9am">9:00 AM</Option>
                <Option value="10am">10:00 AM</Option>
                <Option value="11am">11:00 AM</Option>
                <Option value="12pm">12:00 PM</Option>
                <Option value="1pm">1:00 PM</Option>
                <Option value="2pm">2:00 PM</Option>
                <Option value="3pm">3:00 PM</Option>
                <Option value="4pm">4:00 PM</Option>
              </Select>
            </Form.Item>
            <Form.Item name="amount" label="Amount ($)" rules={[{ required: true }]}>
              <InputNumber min={0} step={0.01} placeholder="0.00" className="w-full" />
            </Form.Item>
          </div>
          <Form.Item name="notes" label="Additional Notes">
            <TextArea rows={4} placeholder="Enter any special instructions or requirements" />
          </Form.Item>
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button onClick={() => setIsNewBookingOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Create Booking
            </Button>
          </div>
        </Form>
  );
};

export default BookingForm;
