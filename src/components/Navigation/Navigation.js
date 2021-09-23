import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Navigation = () => (
  <Tabs defaultActiveKey="1"  className="navigation">
    <TabPane tab="Search" key="1" />
    <TabPane tab="Rated" key="2" disabled />
  </Tabs>
);

export default Navigation