import React, { Component } from 'react';
import {regExpConfig} from '../../utils/regExp.config';
import './RegisterForm.scss'
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;



class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    validatePhoneNum= (rule, value, callback) => {
        const form = this.props.form;
        if(value && !regExpConfig.mobile.test(value)){
            callback('手机号输入不符合!');

        }else{
            callback()
        }


    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="电子邮箱"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '您输入的不是邮箱地址',
                        }, {
                            required: true, message: '请输入您的邮箱地址',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入您的密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="请再输入密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再输入密码!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            昵称&nbsp;
                <Tooltip title="您想让别人怎样称呼您?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
   
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入您的手机号码!' },{
                            validator:this.validatePhoneNum
                        }
                    ],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网页地址"
                >
                    {getFieldDecorator('website', {
                        rules: [{ required: false, message: '请输入您的网站地址!' }],
                    })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                        >
                            <Input />
                        </AutoComplete>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>我已经阅读<a href="">协议书</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{transform:'translateX(50px)'}}>注册</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);


class RegisterForm extends Component{
    render(){
        return (
            <section className="registerform-wrapper">
                <WrappedRegistrationForm />
            </section>
        )
    }
}
export default RegisterForm
