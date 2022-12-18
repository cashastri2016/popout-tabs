import React, {useEffect, useReducer, useRef} from 'react';
import './App.css';
import {Button, Dropdown, Select} from 'antd';
import {Layout, Model, IJsonModel, TabNode} from 'flexlayout-react';
import {DropdownProps} from "antd/lib/dropdown/dropdown";

const json: IJsonModel = {
    global: {
        tabEnableFloat: true
    },
    borders: [],
    layout: {
        type: "row",
        weight: 100,
        children: [
            {
                type: "tabset",
                weight: 50,
                children: [
                    {
                        type: "tab",
                        name: "Two",
                        component: "demo",
                    }
                ]
            }
        ]
    }
};

const model = Model.fromJson(json);
const factory = (node: TabNode) => {
    const component = node.getComponent();
    if (component === "demo") {
        return <Demo/>;
    }
    return <Button type="primary">Button</Button>
}

function App() {
    return (
        <Layout
            popoutURL="popout.html"
            model={model} factory={factory}/>
    );
}

export default App;


const Demo = () => {
    const ref = useRef<HTMLDivElement>(null);

    return <div ref={ref}>
        <DDropDown
            getPopupContainer={() => ref.current?.ownerDocument.body || document.body}
        />
        <DSelect/>
    </div>
}

const items = [
    {label: 'item 1', key: 'item-1'}, // remember to pass the key prop
    {label: 'item 2', key: 'item-2'},
];
const DDropDown = (props: DropdownProps) => {

    return (
        <Dropdown {...props} menu={{items}}>
            <a>Hover me</a>
        </Dropdown>
    );
}

const DSelect = () => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return <>
        <Select
            defaultValue="lucy"
            style={{width: 120}}
            onChange={handleChange}
            options={[
                {value: 'jack', label: 'Jack',},
                {value: 'lucy', label: 'Lucy',},
                {value: 'disabled', disabled: true, label: 'Disabled',},
                {value: 'Yiminghe', label: 'yiminghe',},
            ]}
        />
    </>
}
