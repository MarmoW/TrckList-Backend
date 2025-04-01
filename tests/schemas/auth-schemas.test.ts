import { faker } from '@faker-js/faker';
import { signInSchema } from '@/schemas';


describe('signInSchema', () => {
    const generateValidInput = () => ({
      email: faker.internet.email(),
      password: faker.internet.password({length: 10}),
    });


    describe('email isnt valid', () => {
    it('should return error if email is not present', () => {
    const input = generateValidInput();
    delete input.email;
    const {error} = signInSchema.validate(input);

    expect(error).toBeDefined();
    });

    it('if email isnt in valid format', () => {
        const input = generateValidInput();
        input.email = faker.lorem.word();
  
        const { error } = signInSchema.validate(input);
  
        expect(error).toBeDefined();
      });
    
    });

    describe('when password isnt valid', () => {
        it('should return an error if password field is empty', () => {
            const input = generateValidInput();
            delete input.password;
            const { error } = signInSchema.validate(input);

            expect(error).toBeDefined();
        });

        it('should return error is password isnt a string', () => {
          const input = generateValidInput();

          const { error } = signInSchema.validate({
            ...input,
            password: faker.number.int({min: 11111111})
          })

          expect(error).toBeDefined();
        });

    });

    it('should return no error if input is valid', () => {
      const input = generateValidInput();

      const { error } = signInSchema.validate(input);

      expect(error).toBeUndefined();
    });

});