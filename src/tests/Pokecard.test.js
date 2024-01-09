import { render, screen, waitFor } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import axios from "axios";
import Pokecard from "../components/Pokecard";
import { axiosResponseMock } from "./pokemonMock";
import userEvent from "@testing-library/user-event";

jest.mock("axios"); // módulo inteiro mockado

describe("PokemonCard unit test", () => {
  beforeEach(() => {
    axios.mockReset();
  });

  test("Should render card with data", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock);
    
    const user = userEvent.setup()
    const openModalMock = jest.fn()

    render(<Pokecard url={'https://pokeapi.co/api/v2/pokemon/bulbasaur'} openModal={openModalMock}/>);

    await waitFor(() => {
      screen.getByText(/Bulbasaur/i)

      screen.getByText(/grass/i)

      screen.getByText(/poison/i)
      
      screen.getByRole('img', {
        name: /bulbasaur/i
      })

      const card = screen.getByRole('article')
      user.click(card)
    });

    expect(openModalMock).toHaveBeenCalled()

  //screen.logTestingPlaygroundURL()
  });


});
