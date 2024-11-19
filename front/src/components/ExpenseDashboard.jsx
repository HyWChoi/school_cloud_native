import React from 'react';
import {
  Container,
  Grid,
  GridItem,
  Button,
  VStack,
} from '@chakra-ui/react';
import DashboardHeader from './DashboardHeader';
import ExpensePieChart from './ExpensePieChart';
import LoginBox from './LoginBox';
import { DummyCategories, DummyTransactions } from '../dummyData';
import TransactionTable from './TransactionTable';
import CategoryModal from './CategoryModal';
import TransactionModal from './TransactionModal';

const ExpenseDashboard = () => {
  const borderColor = 'gray.200';

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={6} align="stretch">
        {/* 제목 */}
        <DashboardHeader />

        {/* 상단 섹션 */}
        <Grid templateColumns="2fr 1fr" gap={4}>
          <GridItem>
            <ExpensePieChart categories={DummyCategories} />
          </GridItem>
          <GridItem>
            <LoginBox />
          </GridItem>
        </Grid>

        {/* 중간 섹션 - 총 지출 */}
        <Grid templateColumns="1fr 1fr" gap={4}>
          <GridItem>
            <CategoryModal />
          </GridItem>
          <GridItem>
            <TransactionModal categories={DummyCategories}/>
          </GridItem>
        </Grid>

        {/* 거래 내역 테이블 */}
        <TransactionTable transactions={DummyTransactions} />
      </VStack>
    </Container>
  );
};

export default ExpenseDashboard;