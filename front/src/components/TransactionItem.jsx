import React from 'react';
import { Tr, Td, Button } from '@chakra-ui/react';

const TransactionItem = ({ transaction }) => {
  return (
    <Tr key={transaction.id}>
      <Td>{transaction.paymentMethod}</Td>
      <Td>{transaction.amount.toLocaleString()}원</Td>
      <Td>{transaction.description}</Td>
      <Td>{transaction.date}</Td>
      <Td>{transaction.category}</Td>
      <Td>
        <Button size="sm">수정</Button>
      </Td>
      <Td>
        <Button size="sm" colorScheme="red">제거</Button>
      </Td>
    </Tr>
  );
};

export default TransactionItem;