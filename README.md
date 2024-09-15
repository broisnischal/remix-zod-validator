# Remix Zod Validator

### Project is still underdevelopment! I recommend don't use in production project!


A simple zod validator for remix.

## Installation

```bash
npm install remix-zod-validator
```

## Usage

```ts
import { z } from "zod";
import { zValidator } from "remix-zod-validator";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const action = zValidator({
  schema,
  async fn(args) {
    // your logic here
  },
});
```

## License

MIT
