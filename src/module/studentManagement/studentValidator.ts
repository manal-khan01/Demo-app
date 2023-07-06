import { Globalvalidator } from '../../common/validator/validator'
import { check } from 'express-validator'




class studentValidator extends Globalvalidator {
    constructor() {
        super(
            {
                create: [
                    check('name').trim().notEmpty().withMessage('name cannot be empty').matches(/[a-zA-Z]+/).withMessage('name is invalid'),
                    check('dob').trim().notEmpty().withMessage('dob cannot be empty').isDate().withMessage('date is invalid'),
                    check('gender').trim().notEmpty().withMessage('gender cannot be empty')
                    .custom((val) => ['Male', 'Female', 'Other'].includes(val)).withMessage('Invalid value of gender, gender can be - Male, Female or Other'),
                    check('email').trim().notEmpty().withMessage('email cannot be empty').isEmail().withMessage("email is invalid"),
                    check('phoneNumber').trim().notEmpty().withMessage('phoneNumber cannot be empty').matches(/^\d+$/).withMessage('Invalid mobile number').isLength({ min: 10, max: 10 }).withMessage("phoneNumber must contain exactly 10 Digits."),
                    check('address').trim().notEmpty().withMessage('address cannot be empty'),
                    check('description').trim().optional(),
                    check('createdBy').trim().optional(),
                ],
                update: [
                    check('name').trim().optional().notEmpty().withMessage('name cannot be empty').matches(/[a-zA-Z]+/).withMessage('name is invalid'),
                    check('dob').trim().optional().notEmpty().withMessage('dob cannot be empty').isDate().withMessage('date is invalid'),
                    check('gender').trim().optional().notEmpty().withMessage('gender cannot be empty').custom((val) => ['Male', 'Female', 'Other'].includes(val)).withMessage('Invalid value of gender, gender can be - Male, Female or Other'),
                    check('email').trim().optional().notEmpty().withMessage('email cannot be empty').isEmail().withMessage("email is invalid"),
                    check('phoneNumber').trim().optional().notEmpty().withMessage('phoneNumber cannot be empty').matches(/^\d+$/).withMessage('Invalid mobile number').isLength({ min: 10, max: 10 }).withMessage("phoneNumber must contain exactly 10 Digits."),
                    check('address').trim().optional().notEmpty().withMessage('address cannot be empty'),
                    check('description').trim().optional(),
                    check('updatedBy').trim().optional(),
                ],
            }
        )
    }
}


export let studentsValidator = new studentValidator()
