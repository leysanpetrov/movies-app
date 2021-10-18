import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Navigation = ({ onChangeTab }) => (
  <Tabs defaultActiveKey="1"
        className="navigation"
        onChange={(activeKey) => onChangeTab(activeKey)}
  >
    <TabPane tab="Search" key="1" />
    <TabPane tab="Rated" key="2" />
  </Tabs>
);

export default Navigation