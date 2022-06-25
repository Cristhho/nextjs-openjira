import { ChangeEvent, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, capitalize, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Layout } from '../../components/layouts';
import { EntryStatus } from '../../interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage: NextPage = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [status, setStatus] = useState<EntryStatus>('pending');
  const [touched, setTouched] = useState<boolean>(false);

  const notValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {

  }

  return (
    <Layout>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader='Creada hace x minutos'
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='Nueva entrada'
                multiline
                label='Nueva entrada'
                value={inputValue}
                onChange={onChangeHandler}
                onBlur={() => setTouched(true)}
                helperText={notValid && 'Ingrese un valor'}
                error={notValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChangeHandler}
                >
                  {
                    validStatus.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant='contained'
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton sx={{ 
        position: 'fixed',
        bottom: 30,
        right: 30,
        backgroundColor: 'red'
       }}>
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  );
}

export default EntryPage;