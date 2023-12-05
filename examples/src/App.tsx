import { Button, Col, Flex, Row } from 'antd';
import { useState } from 'react';
import { Button as CButton, ModalForm } from 'react-cjx-ui';
import { ModalFormItem } from 'react-cjx-ui/src/modalForm/types';

const App: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const formItem: ModalFormItem[] = [
    {
      title: '测试Input',
      name: 'input',
      type: 'input',
      rules: [{ required: true, message: '请输入测试名称' }],
      enterProps: {
        allowClear: true,
      },
    },
    {
      title: '测试Select',
      name: 'select',
      type: 'select',
      rules: [{ required: true, message: '请选择select' }],
      selectArr: [
        { label: '第一选择器', value: 1 },
        { label: '第二选择器', value: 2 },
      ],
      enterProps: {
        allowClear: true,
      },
    },
    {
      title: '测试Switch',
      name: 'switch',
      type: 'switch',
      enterProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
    },
    {
      title: '测试Radio',
      name: 'radio',
      type: 'radio',
      rules: [{ required: true, message: '请选择radio' }],
      selectArr: [
        { label: '第一个Radio', value: 1 },
        { label: '第二个Radio', value: 2 },
      ],
      enterProps: {
        optionType: 'button',
      },
    },
    {
      title: '测试DatePicker',
      name: 'datePicker',
      type: 'datePicker',
      rules: [{ required: true, message: '请选择datePicker' }],
      enterProps: {
        format: 'YYYY-MM-DD',
      },
    },
    {
      title: '测试RangePicker',
      name: 'rangePicker',
      type: 'rangePicker',
      rules: [{ required: true, message: '请选择datePicker' }],
      enterProps: {
        format: 'YYYY-MM-DD',
        style: { width: '100%' },
      },
    },
    {
      title: '测试upload',
      name: 'upload',
      type: 'upload',
      enterProps: {
        action: `https://feimadev.feimawaiqin.com:9797/rest/file/upload`,
        uploadNumber: 3,
      },
    },
  ];

  return (
    <>
      <Flex gap='small' wrap='wrap'>
        <CButton
          label='测试ModalForm框'
          primary
          onClick={() => setVisible(true)}
        ></CButton>
      </Flex>
      <ModalForm
        open={visible}
        width={500}
        // formLayout='two'
        title='测试ModalForm框'
        data={{ select: 1 }}
        formItem={formItem}
        onSubmit={(val) => {
          console.log(val);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        modalFooter={(ok, cancel) => {
          return (
            <Row justify='end'>
              <Col span={4}>
                <Button onClick={cancel}>取 消</Button>
              </Col>
              <Col span={4}>
                <Button type='primary' onClick={ok}>
                  确 定
                </Button>
              </Col>
            </Row>
          );
        }}
      />
    </>
  );
};

export default App;
