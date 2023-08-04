import { registerDecorator, ValidationOptions } from 'class-validator';

export function SameAs(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'sameAs',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: any) {
          const [relatedPropertyName] = args.constraints;
          return args.object[relatedPropertyName] === value;
        },
        defaultMessage() {
          return '$property must match $constraint1';
        },
      },
    });
  };
}
