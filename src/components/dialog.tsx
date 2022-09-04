import React, {FC} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { IItem } from '../interfaces/user';
import { Avatar } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: 200
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const Title = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface CustomizedDialogsProps {
    open: boolean;
    setOpen: Function;
    user: IItem;
}

const CustomizedDialogs: FC<CustomizedDialogsProps> = ({open, setOpen, user}) => {
  return (
    <BootstrapDialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Title id="customized-dialog-title" onClose={() => setOpen(false)}>
          Profil
        </Title>
        <DialogContent dividers>
            <Avatar src={user.avatar_url} alt='avatar' sx={{ width: 100, height: 100, marginBottom: 4 }} variant="rounded" />
            <Typography gutterBottom>
                id: {user.id}
            </Typography> 
            <Typography gutterBottom>
                login: {user.login}
            </Typography>
            <Typography gutterBottom>
                <a href={user.html_url} target='blank'>Profile</a>
            </Typography>
        </DialogContent>
      </BootstrapDialog>
  );
}

export default CustomizedDialogs;