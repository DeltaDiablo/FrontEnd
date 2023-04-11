import signuppage from './../pages/SignUpPage.vue';
import {render,screen, waitFor} from '@testing-library/vue';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
//import axios from 'axios';
import 'whatwg-fetch';
import {rest } from 'msw';

describe('Sign Up Page Actions',()=>{
  describe('Load Events',()=>{
    it('SignUp Page Loads',()=>{
      render(signuppage);
      const header = screen.queryByRole('heading',{name:'Sign Up'});
      expect(header).toBeInTheDocument();
    });
    it('User Name Input textbox Loads',()=>{
      render(signuppage);
      //const un = screen.queryByLabelText("username");
      expect(screen.queryByLabelText("User Name:")).toBeInTheDocument();
    });
    it('User Email textbox Loads',()=>{
      render(signuppage);
      //const em = screen.queryByLabelText("email");
      expect(screen.queryByLabelText("Email Address:")).toBeInTheDocument();
    });
    it('User primary password textbox Loads',()=>{
      render(signuppage);
      //const em = screen.queryByLabelText("email");
      expect(screen.queryByLabelText("Enter Password:")).toBeInTheDocument();
    });
    it('User secondary password textbox Loads',()=>{
      render(signuppage);
      //const em = screen.queryByLabelText("email");
      expect(screen.queryByLabelText("Enter Password Again:")).toBeInTheDocument();
    });
    it('Submit Button Loads disabled',()=>{
      render(signuppage);
      expect(screen.queryByRole("button",{name:"Submit"})).toBeDisabled();
    });
  });
  });
  describe('Validation and masking', ()=>{
    it('Primary Password textbox is masked',()=>{
      render(signuppage);
      expect(screen.queryByLabelText("Enter Password:").type).toBe("password");
    });
    it('Secondary Password textbox is masked',()=>{
      render(signuppage);
      expect(screen.queryByLabelText("Enter Password Again:").type).toBe("password");
    });
    it('button enabled when passwords match', async ()=>{
      render(signuppage);
     const pw1 = screen.queryByLabelText("Enter Password:");
     const pw2 = screen.queryByLabelText("Enter Password Again:");
      await userEvent.type(pw1,"Passw0rd");
      await userEvent.type(pw2,"Passw0rd");
      expect(screen.queryByRole("button",{name:"Submit"})).toBeEnabled();
    });
    it('button disabled when passwords do not match', async ()=>{
      render(signuppage);
     const pw1 = screen.queryByLabelText("Enter Password:");
     const pw2 = screen.queryByLabelText("Enter Password Again:");
      await userEvent.type(pw1,"Passw0rd");
      await userEvent.type(pw2,"Password");
      expect(screen.queryByRole("button",{name:"Submit"})).toBeDisabled();
    });
    it('Submit button returns invalid for no user name', async ()=>{
      render(signuppage);
    });
    it('email textbox is correct',()=>{
      render(signuppage);
    });
    it('username textbox is not Empty',()=>{
      render(signuppage);
    });
    it('username is available',()=>{
      render(signuppage);
    });
    it('email is not registered',()=>{
      render(signuppage);
    });
  });
  describe('API integration and functions', ()=>{
    it('Submit username and email to backend', async ()=>{
      let reqbody;
      const server = setupServer(
        rest.post("api/1.0/users",(req, res, ctx)=>{
          reqbody= req.json();
        return res(ctx.status(200));
      })
      );
      server.listen();
      render(signuppage);
      const uid = screen.queryByLabelText("User Name:");
      const eml = screen.queryByLabelText("Email Address:");
      const pw1 = screen.queryByLabelText("Enter Password:");
      const pw2 = screen.queryByLabelText("Enter Password Again:");
      await userEvent.type(uid,"usertestline91");
      await userEvent.type(eml,"usertestline92@email.com")
      await userEvent.type(pw1,"Passw0rd");
      await userEvent.type(pw2,"Passw0rd");
      const btn = screen.queryByRole("button",{name:"Submit"});
      
    //const mockFn = jest.fn();
    //window.fetch = mockFn;
    //axios.post = mockFn;

     await userEvent.click(btn);
     await server.Close();
    //const fc = mockFn.mock.calls[0]
    //const body = JSON.parse(fc[1].body);
      
    //result
      expect(reqbody).toEqual({
        username:"usertestline91",
        email:"usertestline92@email.com",
        password:"Passw0rd"
      });
    });
  });
