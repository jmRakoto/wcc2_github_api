import React, { FC } from 'react';
import { CircularProgress, Stack } from '@mui/material';

const Loader: FC = () => {
    return (
        <Stack alignItems="center" marginTop={20}>
            <CircularProgress />
        </Stack>
    )
}

const LoaderTable: FC = () => {
    return (
        <Stack alignItems="center" marginLeft={30} marginTop={2}>
            <CircularProgress />
        </Stack>
    )
}

export {Loader,LoaderTable};