import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';

type EntryCardProps = {
  entry: Entry;
}

export const EntryCard: FC<EntryCardProps> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStartHandler = (event: DragEvent) => {
    event.dataTransfer.setData('id', entry._id);

    startDragging();
  };

  const onDragEndHandler = () => {
    endDragging();
  };

  const onClickHandler = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      sx={{
        marginBottom: 1
      }}
      draggable
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
      onClick={onClickHandler}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>
        <CardActions sx={{
          display: 'flex',
          justifyContent:'end',
          paddingRight: 2
        }}>
          <Typography variant='body2'>hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
