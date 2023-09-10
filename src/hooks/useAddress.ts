import { useState, useCallback, useMemo } from "react";

import { debounce } from "lodash";

import httpClient from "../config/axios";

interface Iaddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

const initialData = {
  cep: "",
  logradouro: "",
  complemento: "",
  bairro: "",
  localidade: "",
  uf: "",
  ibge: "",
  gia: "",
  ddd: "",
  siafi: "",
};

const useAddress = () => {
  const [addressData, setAddressData] = useState<Iaddress>(initialData);

  const getAddress = useCallback(async (postalCode: string) => {
    httpClient.defaults.baseURL = "https://viacep.com.br/ws";
    const { data } = await httpClient.get(`${postalCode}/json/`);

    setAddressData((prev) => {
      return {
        ...prev,
        data,
      };
    });
  }, []);

  const debouncedAddress = useMemo(() => {
    return debounce(getAddress, 1000);
  }, [getAddress]);

  return {
    addressData,
    getAddress,
    debouncedAddress,
  };
};

export default useAddress;
