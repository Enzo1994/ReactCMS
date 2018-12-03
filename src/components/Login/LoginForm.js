import React,{Component} from 'react';
import './LoginForm.scss'
import {NavLink} from 'react-router-dom'

import {
    Form, Icon, Input, Button, Checkbox,
  } from 'antd';
  
  const FormItem = Form.Item;
  

  class NormalLoginForm extends React.Component {
     handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form" style={{    maxWidth: 300+'px'
        }}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:100+'%'}}>
             登陆
            </Button>
            或者 <NavLink to="/register">现在注册!</NavLink>
          </FormItem>
        </Form>
      );
    }
  }
  
  const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
  




class LoginForm extends Component{
    render(){
        return (
            <section className="loginform-wrapper">
                <WrappedNormalLoginForm />
            </section>
        )
    }
}

export default LoginForm;
