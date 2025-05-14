import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useLocation } from 'react-router-dom';
import customerColumns from '../../../components/customerTable';
// import Spinner from '../Spinner';


function Customers() {
    const [datas, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const { search } = location;

    useEffect(() => {
        setLoading(true);
        setData([
            {
                "_id": "6032827875ab6731543e1d96",
                "tag": [
                    "Quality",
                    "Best"
                ],
                "service_id": "6",
                "name": "Poonam Decor",
                "type": "5",
                "description": "Provides best services in area.",
                "experiance": "10 Years",
                "image": null,
                "customers_served": "111",
                "address": "6",
                "owner": "6",
                "addressObj": {
                    "_id": "60320a8e75ab6731543e19ed",
                    "id": "6",
                    "street1": "Everest Park 2",
                    "street2": "Kalavad Road",
                    "city": "6",
                    "state": "1",
                    "country": "91",
                    "zipcode": "360001",
                    "newCity": {
                        "_id": "60321bed75ab6731543e1b7c",
                        "id": "6",
                        "city": "Morbi",
                        "state": "1",
                        "country": "91"
                    },
                    "newState": {
                        "_id": "60321ca475ab6731543e1c9b",
                        "id": "1",
                        "state": "Gujarat"
                    },
                    "newCountry": {
                        "_id": "60321c8475ab6731543e1c0a",
                        "country": "India",
                        "calling_code": "91"
                    }
                },
                "typeObj": {
                    "_id": "60321c2c75ab6731543e1b85",
                    "id": "5",
                    "name": "Decor"
                },
                "ownerObj": {
                    "services": [
                        "6"
                    ],
                    "_id": "6032825e75ab6731543e1d74",
                    "id": "6",
                    "name": "Rakesh Sharma",
                    "phone": "4657687980",
                    "email": "rakesh@dummy.com",
                    "gender": "Male",
                    "address": "5",
                    "addressObj": {
                        "_id": "60320a8e75ab6731543e19ec",
                        "id": "5",
                        "street1": "Everest Park 2",
                        "street2": "Kalavad Road",
                        "city": "5",
                        "state": "1",
                        "country": "91",
                        "zipcode": "360001",
                        "newCity": {
                            "_id": "60321bed75ab6731543e1b7b",
                            "id": "5",
                            "city": "jamnagar",
                            "state": "1",
                            "country": "91"
                        },
                        "newState": {
                            "_id": "60321ca475ab6731543e1c9b",
                            "id": "1",
                            "state": "Gujarat"
                        },
                        "newCountry": {
                            "_id": "60321c8475ab6731543e1c0a",
                            "country": "India",
                            "calling_code": "91"
                        }
                    }
                }
            }
        ])
        setLoading(false);

        // axios
        //   .post(API.services, getArrayParams(search))
        //   .then((res) => {
        //     if (res.data.success) {
        //       setData(res.data.data);
        //       setLoading(false);
        //     }
        //   })
        //   .catch((e) => {
        //     setLoading(false);
        //   });
    }, [search]);

    return !loading ? (
        <Table
            loading={loading}
            columns={customerColumns}
            bordered
            rowKey={(render) => render._id}
            dataSource={datas}
            pagination={{ pageSize: 20 }}
            scroll={{ x: 1300 }}
        />
    ) : (
        "loading..."
        // <Spinner />
    );
}

export default Customers;
