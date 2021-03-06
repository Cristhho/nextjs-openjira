import { ChangeEvent, useMemo, useState, useContext } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, capitalize, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface NextPageProps {
  entry: Entry
}

const EntryPage: NextPage<NextPageProps> = ({ entry }) => {
  const [inputValue, setInputValue] = useState<string>(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState<boolean>(false);
  const { updateEntry } = useContext(EntriesContext);

  const notValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if(inputValue.trim().length === 0) return;
    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status
    }
    updateEntry(updatedEntry, true);
  }

  return (
    <Layout title={inputValue.substring(0,20) + '...'}>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title='Entrada:'
              subheader={`Creada hace ${dateFunctions.getDateDistanceToNow(entry.createdAt)}`}
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

export const getServerSideProps:GetServerSideProps = async ({ params }) => {
  const { id } = params as {id: string};

  const entry = await dbEntries.getEntryById(id);
  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props:{
      entry
    }
  }
}

export default EntryPage;