import { useState, useCallback, useMemo } from "react";

import { debounce } from "lodash";

import axios from "axios";

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
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${postalCode}/json/`
      );

      setAddressData((prev) => {
        return {
          ...prev,
          ...data,
        };
      });
    } catch (err: any) {
      throw Error(err);
    }
  }, []);

  const debouncedAddress = useMemo(() => {
    return debounce(getAddress, 2000);
  }, [getAddress]);

  return {
    addressData,
    getAddress,
    debouncedAddress,
  };
};

export default useAddress;
