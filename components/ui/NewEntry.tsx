import { ChangeEvent, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewEntry = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onCancelHandler = () => {
    setIsAdding(false);
    setInputValue('');
    setTouched(false);
  };

  const onSave = () => {
    if (inputValue.length  === 0) return;
  }

  return (
    <Box sx={{
      marginBottom: 2,
      paddingX: 1
    }}>
      {
        isAdding ? (
          <>
            <TextField
              fullWidth
              sx={{ marginTop: 2, marginBottom: 1 }}
              placeholder='Nueva entrada'
              multiline
              label='Nueva entrada'
              helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
              error={inputValue.length <= 0 && touched}
              value={inputValue}
              onChange={onChangeHandler}
              onBlur={() => setTouched(true)}
            />
            <Box display='flex' justifyContent='space-between'>
              <Button
                variant='text'
                endIcon={<CancelOutlinedIcon />}
                onClick={onCancelHandler}
              >
                Cancelar
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                endIcon={<SaveOutlinedIcon />}
                onClick={onSave}
              >
                Guardar
              </Button>
            </Box>
          </>
        )
        : (
          <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            fullWidth
            variant='outlined'
            onClick={() => setIsAdding(true)}
          >
            Agregar tarea
          </Button>
        )
      }
    </Box>
  );
}
