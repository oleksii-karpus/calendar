import { Box, BoxProps, styled } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WrapperStyled = styled(({ $isOver, ...props }: { $isOver?: boolean } & BoxProps) => <Box {...props} />)`
    flex: 1;
    background-color: ${({ $isOver }) => ($isOver ? lightBlue[50] : 'transparent')};
    transition: background-color 0.2s ease;
`;
