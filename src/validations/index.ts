import z from "zod";

// Create Article Validation Schema
export const createArticleSchema = z.object({
    title: z.string({message: "Title Required"})
        .min(1, "Title Required")
        .max(100, "Title must be at most 100 characters long"),

    description: z.string({message: "Description Required"})
        .min(20, "Description must be at least 20 characters long")
        .max(2000, "Description must be at most 2000 characters long"),
})


// Update Article Validation Schema
export const updateArticleSchema = z.object({
    title: z.string()
        .min(1, "Title Required")
        .max(100, "Title must be at most 100 characters long")
        .optional(),

    description: z.string()
        .min(20, "Description must be at least 20 characters long")
        .max(2000, "Description must be at most 2000 characters long")
        .optional(),
})

// Create (Register) User Validation Schema
export const registerSchema = z.object({
    username: z.string({message: "Username Required"})
        .min(1, "Name Required")
        .max(100, "Name must be at most 100 characters long"),

    email: z.string({message: "Email Required"})
        .min(1, "Email Required")
        .email("Invalid email address"),

    password: z.string({message: "Password Required"})
        .max(100, "Password must be at most 100 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            { message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character" }
        ),
})

// Login User Validation Schema
export const loginSchema = z.object({
    email: z.string({message: "Email Required"})
        .min(1, "Email Required")
        .email("Invalid email address"),

    password: z.string({message: "Password Required"})
        .min(1, "Password Required")
})

// Update User Schema
export const updateUserSchema = z.object({
    username: z.string({message: "Username Required"})
        .min(1, "Name Required")
        .max(100, "Name must be at most 100 characters long")
        .optional(),

    email: z.string({message: "Email Required"})
        .min(1, "Email Required")
        .email("Invalid email address")
        .optional(),

    password: z.string({message: "Password Required"})
        .max(100, "Password must be at most 100 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            { message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character" }
        )
        .optional(),
})

// Create Comment Schema
export const createCommentSchema = z.object({
    text: z.string({ message: "Comment Required" })
        .min(1, "Comment Required")
        .max(1000, "Comment must be at most 1000 characters long"),

    articleId: z.number({ message: "Article ID Required, Must be a number" }),
})

// Create Comment Schema
export const updateCommentSchema = z.object({
    text: z.string({ message: "Comment Required" })
        .min(1, "Comment Required")
        .max(1000, "Comment must be at most 1000 characters long"),
})
