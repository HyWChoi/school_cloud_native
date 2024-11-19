import React from 'react';
import { Box, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { PieChart, Pie, Cell } from 'recharts';

const ExpensePieChart = ({ categories }) => {
  return (
    <Box p={4} borderWidth={1} borderColor="gray.200" borderRadius="lg">
      <HStack spacing={8}>
        <Box width="200px" height="200px">
          <PieChart width={200} height={200}>
            <Pie
              data={categories}
              cx={100}
              cy={100}
              innerRadius={0}
              outerRadius={80}
              dataKey="value"
            >
              {categories.map((category, index) => (
                <Cell key={index} fill={category.color} />
              ))}
            </Pie>
          </PieChart>
        </Box>
        <Box>
          <Heading size="md" mb={4}>카테고리별 지출 비율</Heading>
          <VStack align="stretch">
            {categories.map((category, index) => (
              <HStack key={index} justify="space-between">
                <Text>{category.name}</Text>
                <Text>{category.value}%</Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default ExpensePieChart;