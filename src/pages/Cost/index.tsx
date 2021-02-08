import React, { useState, useRef, useCallback } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { BiTime, BiPhone } from 'react-icons/bi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface CostFormData {
  from: string;
  to: string;
  plan: string;
  time: number;
}

interface CostApiData {
  costWithPlan: string;
  costWithoutPlan: string;
}

const Cost: React.FC = () => {
  const [plan, setPlan] = useState('FaleMais 50');
  const [costWithPlan, setCostWithPlan] = useState('R$ 41,80');
  const [costWithoutPlan, setCostWithoutPlan] = useState('R$ 95,00');
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: CostFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        from: Yup.string().required('DDD de origem é obrigatório'),
        to: Yup.string().required('DDD de destino é obrigatório'),
        plan: Yup.string().required('Nome do plano é obrigatório'),
        time: Yup.number().required('Tempo de ligação é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setPlan(data.plan);

      const response = await api.get<CostApiData>(
        `/cost/from/${data.from}/to/${data.to}/time/${data.time}/plan/${data.plan}`,
      );

      setCostWithPlan(response.data.costWithPlan);
      setCostWithoutPlan(response.data.costWithoutPlan);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Telzir" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Preencha os campos abaixo</h2>

            <Input
              name="from"
              icon={FiChevronRight}
              placeholder="DDD de origem"
              defaultValue="011"
            />
            <Input
              name="to"
              icon={FiChevronLeft}
              placeholder="DDD de destino"
              defaultValue="016"
            />
            <Input
              name="plan"
              icon={BiPhone}
              placeholder="Escolha seu plano"
              defaultValue="FaleMais 30"
            />
            <Input
              name="time"
              icon={BiTime}
              placeholder="Minutos usados"
              defaultValue="50"
            />

            <Button type="submit">Comparar</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background>
        <h3>Com {plan} Sai por apenas</h3>
        <h1>{costWithPlan}</h1>
        <h4>Sem plano custa</h4>
        <h2>{costWithoutPlan}</h2>
      </Background>
    </Container>
  );
};

export default Cost;
