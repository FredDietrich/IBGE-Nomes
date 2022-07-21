import React, { ReactElement } from 'react';
import { Stack, styled } from '@mui/material';
import "./SearchContainer.css"

interface IProps {
    children?: Array<ReactElement>
}

const StyledBox = styled(Stack)(({ theme }) => ({
    padding: '2%',
    [theme.breakpoints.down('md')]: {
        margin: '0 0 0 0',
    },
    [theme.breakpoints.up('md')]: {
        margin: '1% 10% 1% 10%',
    },
    [theme.breakpoints.up('lg')]: {
        margin: '1% 25% 1% 25%',
    }
}));

export default function SearchContainer(props : IProps) {

    return (
        <div className="SearchContainer">
            <StyledBox
                className="searchBox"
                spacing={2}
                display="flex"
                alignItems="center"
            >
                {props.children}
            </StyledBox>
        </div>
    )

}