import React, { useState } from 'react';
import "./Search.css"
import 'antd/dist/antd.css';
import { AutoComplete } from 'antd';
import "../../App/App";

const Search = () => {

    const { Option } = AutoComplete;
    const [result] = useState([]);

    return (
      <AutoComplete className="input-search"
                    placeholder="Type to search"
      >
        {result.map((value) => (
          <Option key={value} value={value}>
            { value }
          </Option>
        ))}
      </AutoComplete>
    );
};

export default Search

