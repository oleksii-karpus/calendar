import { Box, FormControl, styled } from '@mui/material';

export const WrapperStyled = styled(Box)`
    border-radius: 5px;
    min-width: 300px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 5px 20px;
`;

export const FormStyled = styled('form')`
    input {
        padding: 5px;
    }
`;

export const FormItemStyled = styled(Box)``;

export const LabelWrapperStyled = styled('label')`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

export const LabelStyled = styled('span')`
    font-size: 12px;
    font-weight: bold;
    margin: 10px 0 5px;
`;

export const ButtonWrapperStyled = styled(Box)`
    display: flex;
    width: 100%;
    gap: 10px;
    margin: 20px 0;
`;

export const FormControlStyled = styled(FormControl)`
    width: 100%;
    margin: 10px 0;
    label {
        background: white;
        padding: 0 5px;
    }
`;

export const FormHeadingStyled = styled(Box)`
    flex: 1 1 100%;
    display: flex;
    justify-content: space-between;
    button {
        position: relative;
        left: -8px;
    }
`;
