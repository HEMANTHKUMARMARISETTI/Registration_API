
import {PostCreateuserProfileResponse,DeleteDeleteuserResponse,GetGetuserdetailsResponse,PutUpdateuserResponse,GetGetuserbyemailResponse,UserApi } from "../../../dist/api/user/types";
import { Api } from "../../../dist/models";
import {collections} from '../../admin/types'


export class UserApiImpl implements UserApi {
    getGetuserdetails(): Promise<GetGetuserdetailsResponse> {
        return new Promise<GetGetuserdetailsResponse>((resolve, reject) => {
            collections.users!.find({}).toArray(function (err: any, result: any) {
                if (err) {
                    const response: GetGetuserdetailsResponse = {
                        status: 400,
                        body: { message: "Something went wrong" },
                    };
                    resolve(response);
                } else {
                    const response: GetGetuserdetailsResponse = {
                        status: 200,  // Changed to 200 for success
                        body: result,
                    };
                    resolve(response);
                }
            });
        });
    }

    getGetuserbyemail(email: string): Promise<GetGetuserbyemailResponse> {
        return new Promise<GetGetuserbyemailResponse>((resolve, reject) => {
            collections.users!.find({email:email}).toArray(function (err: any, result: any) {
                if (err) {
                    const response: GetGetuserbyemailResponse = {
                        status: 400,
                        body: { message: "Something went wrong" },
                    };
                    resolve(response);
                } else {
                    const response: GetGetuserbyemailResponse = {
                        status: 200,  // Changed to 200 for success
                        body: result,
                    };
                    resolve(response);
                }
            });
        });
    }


    deleteDeleteuser(email: string):Promise<DeleteDeleteuserResponse>{
    return new Promise<DeleteDeleteuserResponse>((resolve,reject)=>{
        collections.users!.deleteOne(
            {email:email},
            function(err: any,result: any){
                if(err){
                    const response=<DeleteDeleteuserResponse>{
                        status:400,
                        body:{message:`someting went wrong`}
                    }
                    resolve(response)
                }
                const response=<DeleteDeleteuserResponse>{
                    status:201,
                    body:{
                        message:`delete User Sucessfully`
                    }
                }
                resolve(response)
            }
        )
        
    })
 }

 putUpdateuser (email : string, request: Api.BODYDATA | undefined) : Promise<PutUpdateuserResponse>
 {
    return new Promise<PutUpdateuserResponse>((resolve,reject)=>{
        collections.users!.updateOne(
            {email:email},
            {$set:request},
            function(err:any,result: any){
                if(err){
                    const response=<PutUpdateuserResponse>{
                        status: 400,
                        body:{message:`Somting Went Wrong`}
                    }
                    resolve(response)
                }
                const response=<PutUpdateuserResponse>{
                    status:201,
                    body:{message:`Update User Sucessfully`}
                }
                resolve(response)
               
            }    
        )

    })
 }


 postCreateuserProfile(request: Api.BODYDATA | undefined): Promise<PostCreateuserProfileResponse>
 {
    return new Promise<PostCreateuserProfileResponse>((resolve,reject)=>{
        collections.users!.findOne(
            {email:request?.email},
            function(err:any,result:any){
                if(result){
                    const response=<PostCreateuserProfileResponse>{
                        status:400,
                        body:{message:`Student Already Created`}
                    }
                    resolve(response)
                }
                else{
                    collections.users!.insertOne(
                        {name:request?.name,email:request?.email,phonenumber:request?.phonenumber,password:request?.password},
                        function(err:any,result:any){
                          if(err){
                            const response=<PostCreateuserProfileResponse>{
                                status:400,
                                body:{message:`Someting Went Wrong`}
                            }
                            resolve(response)
                          }
                          else{
                            const response=<PostCreateuserProfileResponse>{
                                status:201,
                                body:{message:`Create User Sucessfuly`}
                            }
                            resolve(response)
                          }
                            
                        }

                    )
                }
            }
        )
    })
 }
}

   
  








