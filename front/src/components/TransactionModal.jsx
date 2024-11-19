import React, { useEffect } from 'react';
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

const TransactionModal = ({ 
  isEdit = false, 
  transaction = null, 
  categories
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const [formData, setFormData] = React.useState({
    type: 'expense',
    category: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (isEdit && transaction) {
      setFormData({
        type: transaction.type || 'expense',
        category: transaction.category || '',
        description: transaction.description || '',
        amount: transaction.amount?.toString() || '',
        date: transaction.date || new Date().toISOString().split('T')[0],
      });
    }
  }, [isEdit, transaction]);

  const handleSubmit = () => {
    if (isEdit) {
      console.log('Updating transaction:', { ...formData, id: transaction.id });
    } else {
      console.log('Creating new transaction:', formData);
    }
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {isEdit ? (
        <Button size="sm" onClick={onOpen}>수정</Button>
      ) : (
        <Button width="100%" onClick={onOpen}>
          [ 입금 / 출금 ] 기록 추가
        </Button>
      )}

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEdit ? '거래 내역 수정' : '[ 입금 / 출금 ] 추가'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>거래 타입</FormLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="income">입금</option>
                  <option value="expense">출금</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>카테고리</FormLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">카테고리를 선택하세요</option>
                  {categories?.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>내용</FormLabel>
                <Input
                  name="description"
                  ref={initialRef}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="예: 맛있는 짜장면, 친구와 만남 등"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>금액</FormLabel>
                <Input
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="금액을 입력하세요"
                  min="0"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>날짜</FormLabel>
                <Input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              {isEdit ? '수정' : '저장'}
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TransactionModal;