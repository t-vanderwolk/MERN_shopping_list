import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import {v1 as uuid} from 'uuid'

class ItemModal extends Component {
 state = {
    modal: false,
    name: ''
 };

 toggle = () => {
this.setState({
    modal: !this.state.modal
});
 };

onChange= (e) => {
   this.setState({ [e.target.name]: e.target.value }); 
 };

onSubmit = e => {
e.preventDefault();

    const newItem = {
id:uuid(),
name: this.state.name

    }
    //Add item via addItem action
    this.props.addItem(newItem);

    //Close Modal
this.toggle();

 }

 render(){
    return(
        <div>
            <Button
            color='dark'
            style={{ marginBottom: '2rem'}}
            onClick={this.toggle}
            >Add Item</Button>
            <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            >
            <ModalHeader
            toggle={this.toggle}
            > Add to Shopping List
            <ModalBody>
                <Form
                onSubmit={this.onSubmit}>
                <FormGroup>
                <Label 
                for = 'item'>
                 Item
                <Input
                type='text'  
                name='name'
                id='item'
                placeholder='Add Shopping Item' 
                onChange={this.onChange}>
                </Input>
                </Label> 
                <Button
                color='dark'
                style={{marginTop:'2rem'}}
                block>
                Submit
                </Button>
                </FormGroup>
                </Form>
            </ModalBody>

            </ModalHeader>
            </Modal>
        </div>
    )
 }
}
const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps, { addItem })(ItemModal);