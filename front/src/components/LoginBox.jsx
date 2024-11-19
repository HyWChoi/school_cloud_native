import React from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
  Divider
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LoginBox = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 기본적인 유효성 검사
    if (!email || !password) {
      toast({
        title: '입력 오류',
        description: '이메일과 비밀번호를 모두 입력해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      // 여기에 실제 로그인 로직 구현
      // const response = await loginUser(email, password);
      console.log('로그인 시도:', { email, password });
      
      toast({
        title: '로그인 성공',
        description: '환영합니다!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: '로그인 실패',
        description: error.message || '로그인에 실패했습니다. 다시 시도해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box p={6} borderWidth={1} borderColor="gray.200" borderRadius="lg" bg="white" shadow="sm">
      <VStack spacing={4} align="stretch">
        <Heading size="md" mb={2}>로그인</Heading>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>이메일</FormLabel>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>비밀번호</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    variant="ghost"
                    onClick={handleTogglePassword}
                    aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isLoading={isLoading}
              loadingText="로그인 중..."
            >
              로그인
            </Button>
          </VStack>
        </form>

        <Divider my={4} />

        <VStack spacing={2}>
          <Text fontSize="sm" color="gray.600">
            아직 계정이 없으신가요?
          </Text>
          <Button
            variant="outline"
            width="100%"
            colorScheme="blue"
          >
            회원가입
          </Button>
        </VStack>

        <Button
          variant="link"
          size="sm"
          colorScheme="gray"
        >
          비밀번호를 잊으셨나요?
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginBox;