import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { addExpense } from '../../api/expense';

interface IAddExpenseModalProps {
  isOpen: Boolean;
  handleClose: () => void;
}

const AddExpenseModal = ({
  isOpen,
  handleClose,
}: IAddExpenseModalProps): JSX.Element => {
  const [formData, setFormData] = useState({
    account_type_id: '',
    expense_name: '',
    expense_description: '',
    expense_amount: '',
    expense_type: '',
  });
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(Boolean(isOpen));
  }, [isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitExpense = async () => {
    await addExpense(formData);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            await handleSubmitExpense();
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent className="flex flex-col gap-5">
          {/* <DialogContentText>Add Expense</DialogContentText> */}
          <TextField
            className="w-64"
            autoFocus
            id="name"
            name="account_type_id"
            label="Account Type"
            type="text"
            variant="standard"
            onChange={(e: any) => handleChange(e)}
          />
          <TextField
            autoFocus
            required
            id="name"
            name="expense_name"
            label="Expense Name"
            type="text"
            variant="standard"
            onChange={(e: any) => handleChange(e)}
            fullWidth
          />
          <TextField
            autoFocus
            required
            id="text"
            name="expense_amount"
            label="Expense Amount"
            type="text"
            variant="standard"
            onChange={(e: any) => handleChange(e)}
            fullWidth
          />
          <TextField
            autoFocus
            id="name"
            name="expense_description"
            label="Expense Description"
            type="text"
            variant="standard"
            onChange={(e: any) => handleChange(e)}
            fullWidth
          />
          <TextField
            autoFocus
            id="name"
            name="expense_type"
            label="Expense Type"
            type="text"
            variant="standard"
            onChange={(e: any) => handleChange(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Expense</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddExpenseModal;
