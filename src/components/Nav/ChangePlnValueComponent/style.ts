import styled from "styled-components";

export const ChangePriceBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 680px) {
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    input,
    button {
      height: 30px;
    }
  }
`;

export const Button = styled.button`
  height: 40px;
  color: ${({ theme }) => theme.colors.blue};
  background: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.p.medium}
  transition: all 0.1s ease-in-out;
  border: none;
  cursor: pointer;
  padding: 0 20px;
  border-radius: 5px;

  &:hover {
    background: ${({ theme }) => theme.colors.gray};
    transition: all 0.1s ease-in-out;
  }
`;
