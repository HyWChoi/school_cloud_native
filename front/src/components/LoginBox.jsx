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
import RegisterModal from './RegisterModal';

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
      // API 호출
      const response = await fetch('/user_service/profile/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(response.status === 401 
          ? '이메일 또는 비밀번호가 올바르지 않습니다.'
          : '로그인 중 오류가 발생했습니다.'
        );
      }

      const data = await response.json();
      
      // 세션 ID를 로컬 스토리지에 저장
      localStorage.setItem('sessionId', data.sessionId);

      toast({
        title: '로그인 성공',
        description: '환영합니다!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // TODO: 로그인 성공 후 리다이렉션 또는 상태 업데이트
      // window.location.href = '/dashboard'; // 또는 React Router 사용
      
    } catch (error) {
      toast({
        title: '로그인 실패',
        description: error.message,
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

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // 비밀번호 유효성 검사 (최소 6자 이상)
  const validatePassword = (password) => {
    return password.length >= 6;
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
                isInvalid={email && !validateEmail(email)}
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
                  isInvalid={password && !validatePassword(password)}
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
              {password && !validatePassword(password) && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  비밀번호는 최소 6자 이상이어야 합니다.
                </Text>
              )}
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isLoading={isLoading}
              loadingText="로그인 중..."
              isDisabled={!validateEmail(email) || !validatePassword(password)}
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
          <RegisterModal />
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