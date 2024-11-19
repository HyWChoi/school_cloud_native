import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import TransactionItem from './TransactionItem';

const TransactionTable = ({ transactions }) => {
  return (
    <Box borderWidth={1} borderColor="gray.200" borderRadius="lg" overflow="hidden">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>트랜잭션 타입</Th>
            <Th>트랜잭션 금액</Th>
            <Th>트랜잭션 내용</Th>
            <Th>소비일자</Th>
            <Th>카테고리</Th>
            <Th>수정</Th>
            <Th>제거</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction) => (
            <TransactionItem transaction={transaction}/>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TransactionTable;