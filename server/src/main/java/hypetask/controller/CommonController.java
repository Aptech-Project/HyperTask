package hypetask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import hypetask.model.Common;
import hypetask.service.CommonService;

@CrossOrigin
@RestController
@RequestMapping("/api/common/")
public class CommonController {

	Gson json = new Gson();

	@Autowired
	private CommonService commonService;

	// Get all Boards
	@GetMapping("/get-all-common")
	public List<Common> getAllBoards() {
		return commonService.getAllCommon();
	}

	@PostMapping("/create-common")
	public Common saveCommon(@RequestBody Common common) {
		commonService.createCommon(common);
		return common;
	}

	@GetMapping("/get-common/{id}")
	public Common getCommon(@PathVariable("id") String id) {
		return commonService.getCommonById(id);
	}

	@PutMapping("/update-common")
	public Common updateCommon(@RequestBody Common common) {
		commonService.createCommon(common);
		return common;
	}

}
