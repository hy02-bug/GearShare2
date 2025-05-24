import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { usePage } from '@inertiajs/react';

export default function OutlinedCard() {
  const { user } = usePage().props;

  return (
    <Box sx={{ minWidth: 200 }}>
      <Card variant="elevated">
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {user.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit Profile</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
