import React, { FC, useState, useEffect } from 'react';
import {
  Button,
  ButtonProps,
  Menu,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  Paginator,
  Container,
  Previous,
  Next,
  PageGroup,
  usePaginator,
} from 'chakra-paginator';
import { convertFromCSV } from '../../common/CSVconverter';

const baseStyles: ButtonProps = {
  w: 10,
  fontSize: 'sm',
};

const normalStyles: ButtonProps = {
  ...baseStyles,
  // _hover: {
  //   bg: 'blue.300',
  // },
  // bg: 'blue.100',
};

const activeStyles: ButtonProps = {
  ...baseStyles,
  //   _hover: {
  //     bg: 'blue.300',
  //   },
  //   bg: 'blue.200',
};

const separatorStyles: ButtonProps = {
  ...baseStyles,
  disabled: true,
};

const Demo: FC = () => {
  const [data, setData] = useState(convertFromCSV());
  const [filtredData, setFiltredData] = useState(data);
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const pagesQuantity = Math.ceil(filtredData.size / 10);
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });
  const getRows = () => {
    const rows: JSX.Element[] = [];
    filtredData.forEach((value: any, key: string) => {
      rows.push(
        <Tr key={key}>
          <Td>{key}</Td>
          <Td>{value.Status}</Td>
          <Td>{value.Type}</Td>
          <Td>{value.ClientName}</Td>
          <Td>{value.Amount}</Td>
          <Td>...</Td>
        </Tr>
      );
    });
    return rows;
  };

  const onPressHandler = (status: string) => {
    if (status === 'All') {
      setFiltredData(data);
    } else {
      const newData = new Map();
      data.forEach((value: any, key: string) => {
        if (value.Status === status) {
          newData.set(key, value);
        }
      });
      setFiltredData(newData);
    }
  };

  useEffect(() => {
    onPressHandler(status);
  }, [status]);

  return (
    <Container align="center" justify="space-between" direction="column" m={10}>
      <Menu>
        <MenuButton as={Button}>Status</MenuButton>
        <MenuList>
          <MenuItem onClick={() => setStatus('All')}>All statuses</MenuItem>
          <MenuItem onClick={() => setStatus('Pending')}>Pending</MenuItem>
          <MenuItem onClick={() => setStatus('Completed')}>Completed</MenuItem>
          <MenuItem onClick={() => setStatus('Cancelled')}>Cancelled</MenuItem>
        </MenuList>
      </Menu>
      <Table
        variant="striped"
        colorScheme="blue"
        border="2px"
        borderColor="blue.100"
      >
        <Thead>
          <Tr>
            <Th>Transaction Id</Th>
            <Th>Status</Th>
            <Th>Type</Th>
            <Th>Client name</Th>
            <Th>Amount</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {getRows().slice(currentPage * 10 - 10, currentPage * 10)}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
      <Paginator
        normalStyles={normalStyles}
        activeStyles={activeStyles}
        separatorStyles={separatorStyles}
        outerLimit={1}
        innerLimit={1}
        pagesQuantity={pagesQuantity}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
        <Container align="center" justify="space-between" p={4}>
          <Previous m={4}>
            Previous
            {/* Or an icon from `react-icons` */}
          </Previous>
          <PageGroup m={4} isInline align="center" />
          <Next m={4}>
            Next
            {/* Or an icon from `react-icons` */}
          </Next>
        </Container>
      </Paginator>
    </Container>
  );
};

export default Demo;
