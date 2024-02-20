import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const AlertDialog = ({ isOpen, closeDialog, title, description }) => {

   const [openDialog, setOpenDialog] = React.useState(isOpen);

   const handleClose = () => {
      setOpenDialog(false);
   };

   return (
      <React.Fragment>
         <Dialog
            open={isOpen}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">
               {title}
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  {description}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Disagree</Button>
               <Button onClick={handleClose} autoFocus>
                  Agree
               </Button>
            </DialogActions>
         </Dialog>
      </React.Fragment>
   );
}