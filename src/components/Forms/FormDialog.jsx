import { render } from '@testing-library/react';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput';

export default class FormDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            description: ""
        }
        this.inputName = this.inputName.bind(this);
        this.inputEmail = this.inputEmail.bind(this);
        this.inputDesc = this.inputDesc.bind(this);
    }

    inputName = (event) => {
        console.log(event.target.value);
        this.setState({name: event.target.value})
    }

    inputEmail = (event) => {
        this.setState({email: event.target.value})
    }

    inputDesc = (event) => {
        this.setState({description: event.target.value})
    }

    submitForm = () =>{
        const name = this.state.name;
        const email = this.state.email;
        const desc = this.state.description;

        const payload = {
            text: 'お問い合わせがありました\n' +
                  'お名前: ' + name + '\n' +
                  'Email: ' + email + '\n' +
                  'お問い合わせ内容:\n' + desc
        }

        const url = 'https://hooks.slack.com/services/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';

        fetch(url,{
            method: 'post',
            body: JSON.stringify(payload)
        }).then(() => {
            alert('送信が完了しました')
            this.setState({
                name: "",
                email: "",
                description: ""
            })
            return this.props.handleClose();
        });
    }




    render() {
        return (
          <Dialog
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
            <DialogContent>
                <TextInput
                    label = {"お名前（必須）"} multiline = {false} rows = {1}
                    value = {this.state.name} type = {"text"} onChange = {this.inputName}
                />
                <TextInput
                    label = {"メールアドレス（必須）"} multiline = {false} rows = {1}
                    value = {this.state.email} type = {"email"} onChange = {this.inputEmail}
                />
                <TextInput
                    label = {"お問い合わせ内容（必須）"} multiline = {true} rows = {5}
                    value = {this.state.desc} type = {"text"} onChange = {this.inputDesc}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleClose} color="primary">
                キャンセル
              </Button>
              <Button onClick={this.submitForm} color="primary" autoFocus>
                送信する
              </Button>
            </DialogActions>
          </Dialog>
        )
    }
}