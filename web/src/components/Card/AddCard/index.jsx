import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import './addcard.css';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {SubmitHandler, useForm} from 'react-hook-form';

const initialDialogState = {
  title: '',
  description: ''
};

const AddBoard = ({closeHandler, open}) => {
  const {register, getValues, handleSubmit, reset} = useForm();

  useEffect(() => {
    if (open == true) {
      reset(initialDialogState);
    }
  }, [open]);

  const onSubmit = (data, e) => {
    if (e) {
      e.preventDefault();
    }
    
    closeHandler();
  };

  return (
    <Dialog id="AddCardDialog" onClose={closeHandler} open={open}>
      <IconButton
        aria-label="close"
        onClick={closeHandler}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        새로운 생각하는 신앙 정보 추가
      </DialogTitle>
      <DialogContent>
        <Container className="container" component="main">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate className="box"
              onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <label>영화/책 제목</label>
                  <input className="buttonStyle"
                    {...register('title', {required: true})}
                    placeholder="영화/책 제목을 입력하세요"
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>설명</label>
                  <input className="buttonStyle"
                    {...register('description')}
                    placeholder="설명을 입력하세요 (optional)"
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>최대 신청 가능 인원 수</label>
                  <input className="buttonStyle"
                    {...register('maxNum')}
                    placeholder="최대 신청 인원 수"
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>모임 날짜</label>
                  <input className="buttonStyle"
                    {...register('startTime')}
                    placeholder="모임 날짜"
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>신청 가능 시간</label>
                  <input className="buttonStyle"
                    {...register('openTime')}
                    placeholder="신청 시작 시간"
                  />
                </Grid>
              </Grid>
              <Button
                className="submitButton"
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                  추가하기
              </Button>
            </Box>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};


export default AddBoard;