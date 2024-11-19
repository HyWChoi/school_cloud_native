import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useDisclosure
} from '@chakra-ui/react';

const TransactionModal = ({ categories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  return (
    <>
      <Button width="100%" onClick={onOpen}>
        [ 입금 / 출금 ] 기록 추가
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>[ 입금 / 출금 ] 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              {/* 거래 타입 선택 */}
              <FormControl isRequired>
                <FormLabel>거래 타입</FormLabel>
                <Select placeholder="거래 타입을 선택하세요">
                  <option value="income">입금</option>
                  <option value="expense">출금</option>
                </Select>
              </FormControl>

              {/* 카테고리 선택 */}
              <FormControl isRequired>
                <FormLabel>카테고리</FormLabel>
                <Select placeholder="카테고리를 선택하세요">
                  {categories?.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* 내용 입력 */}
              <FormControl isRequired>
                <FormLabel>내용</FormLabel>
                <Input 
                  ref={initialRef}
                  placeholder="예: 맛있는 짜장면, 친구와 만남 등"
                />
              </FormControl>

              {/* 금액 입력 */}
              <FormControl isRequired>
                <FormLabel>금액</FormLabel>
                <Input 
                  type="number"
                  placeholder="금액을 입력하세요"
                  min="0"
                />
              </FormControl>

              {/* 날짜 선택 */}
              <FormControl isRequired>
                <FormLabel>날짜</FormLabel>
                <Input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              저장
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TransactionModal;