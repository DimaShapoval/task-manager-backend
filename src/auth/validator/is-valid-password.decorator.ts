    import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

    export function IsValidPassword(validationOptions?: ValidationOptions) {
      return function (object: Object, propertyName: string) {
        registerDecorator({
          name: 'isStrongPassword',
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          validator: {
            validate(value: any, args: ValidationArguments) {
              // Custom password strength logic here
              // Example: requires at least one uppercase, one lowercase, one number, one special char, and min length
              const hasUppercase = /[A-Z]/.test(value);
              const hasLowercase = /[a-z]/.test(value);
              const hasNumber = /[0-9]/.test(value);
              const hasSpecialChar = /[!@#$%^&*()]/.test(value);
              const minLength = value.length >= 8;

              return hasUppercase && hasLowercase && hasNumber && hasSpecialChar && minLength;
            },
            defaultMessage(args: ValidationArguments) {
              return `${args.property} is not strong enough. It must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.`;
            },
          },
        });
      };
    }